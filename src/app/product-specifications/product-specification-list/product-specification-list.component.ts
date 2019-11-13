import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductSpecification } from 'src/app/_models/productSpecification';
import { ToastrService } from 'src/app/_services/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProductSpecificationService } from 'src/app/_services/product-specification.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-specification-list',
  templateUrl: './product-specification-list.component.html',
  styleUrls: ['./product-specification-list.component.css']
})
export class ProductSpecificationListComponent implements OnInit {
  productSpecifications: ProductSpecification[];
  productSpecification: ProductSpecification;
  modalRef: BsModalRef;
  public upsertForm: FormGroup;

  constructor(private router: ActivatedRoute, private productSpecificationService: ProductSpecificationService,
    private formBuilder: FormBuilder, private toastr: ToastrService, private modalService: BsModalService) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.productSpecifications = data.productSpecifications;
    });
  }

  openModal(template: TemplateRef<any>, productSpecification: ProductSpecification) {
    this.productSpecification = productSpecification;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.createUpsertForm();
  }

  createUpsertForm() {
    const manufacturer = this.productSpecification ? this.productSpecification.manufacturer : '';
    const series = this.productSpecification ? this.productSpecification.series : '';
    const name = this.productSpecification ? this.productSpecification.name : '';

    this.upsertForm = this.formBuilder.group({
      manufacturer: [manufacturer, [Validators.required, Validators.maxLength(100)]],
      series: [series, [Validators.required, Validators.maxLength(50)]],
      name: [name, [Validators.required, Validators.maxLength(50)]]
    });
  }

  upsert() {
    const id = this.productSpecification ? this.productSpecification.id : null;
    this.productSpecification = Object.assign({}, this.upsertForm.value);
    this.productSpecification.id = id;
    this.productSpecificationService.upsertProductSpecification(this.productSpecification).subscribe(() => {
      // TODO: Reload product specifications
      this.modalRef.hide();
      this.productSpecification = null;
      this.toastr.success('Zapisano zmiany.');
    }, error => {
      this.toastr.error(error);
    });
  }

  changeIsActive(productSpecificationId: number, wasActive: boolean): void {
    this.modalRef.hide();
    this.productSpecificationService.changeIsActive(productSpecificationId).subscribe(() => {
      // TODO: Reload product specifications
      const activeMessage = wasActive ? 'Dezaktywowano' : 'Aktywowano';
      this.toastr.success(activeMessage + ' produkt.');
    }, error => {
      this.toastr.error(error);
    });
  }

  decline(): void {
    this.productSpecification = null;
    this.modalRef.hide();
  }

}
